package app.repos;

import app.contract.UsersDAO;
import app.domain.Profile;
import app.exceptions.UsersException;
import app.service.CookieUtil;

import javax.servlet.http.Cookie;
import java.sql.*;
import java.util.*;
import java.util.Date;
import java.sql.Timestamp;

import static app.service.CookieUtil.COOKIE_NAME;

public class MySQL_UsersDAO implements UsersDAO {
    private final Connection conn;

    public MySQL_UsersDAO(Connection conn) {
        this.conn = conn;
    }

    // KEY: UID; VALUE: email
    private final Map<String, String> loggedUsers = new HashMap<>();

    public String generateId() {
        return UUID.randomUUID().toString();
    }

    @Override
    public Optional<Profile> getActiveUserProfile(Cookie[] cookies) throws UsersException {
        Optional<Cookie> myCookie = CookieUtil.findMyCookie(COOKIE_NAME, cookies);
        if (myCookie.isEmpty()) return Optional.empty();
        String userUID = myCookie.get().getValue();
        String userEmail = loggedUsers.get(userUID);
        return Optional.of(getUserProfileByEmail(userEmail));
    }

    public Optional<String> logout(String key) {
        return checkLogged(key)
                .map(userEmail -> {
                    loggedUsers.remove(key);
                    return userEmail;
                });
    }

    // We already have a connection to DB in this class. It was assigned in constructor.
    // So in this method we should get actual user password from DB and compare it with the password
    // that was passed to this method as a parameter.
    public boolean checkPassword(String userEmail, String pass) {
        return Optional.ofNullable(getUserPasswordByEmail(userEmail))
                .filter(p -> p.equals(pass))
                .isPresent();
    }

    public Optional<String> checkAndLogin(String userEmail, String pass) {
        return checkPassword(userEmail, pass) ? Optional.of(login(userEmail)) : Optional.empty();
    }

    public Optional<String> checkLogged(String key) {
        return Optional.ofNullable(loggedUsers.get(key));
    }

    private String login(String email) {
        String key = generateId();
        loggedUsers.put(key, email); // KEY: UID; VALUE: email
        saveUserLoginDate(email);
        return key;
    }

    public void saveUserRateData(Cookie[] cookies, String userRate, Profile userProfile) throws UsersException {
        Profile activeUser = getActiveUserProfile(cookies).get();

        String sqlUsr = """
                INSERT INTO reactions(user_who_id, user_whom_id, reaction) VALUES(?, ?, ?);
                """;
        try (PreparedStatement stmt = conn.prepareStatement(sqlUsr)) {
            stmt.setInt(1, activeUser.getId());
            stmt.setString(3, userRate);
            stmt.setInt(2, userProfile.getId());
            stmt.executeUpdate();
        } catch (SQLException ex) {
            throw new UsersException("An error occurred when executing method saveUserRateData().");
        }
    }

    @Override
    public Optional<List<Profile>> getUserLikedProfiles(Cookie[] cookies) throws UsersException {
        Profile activeUser = getActiveUserProfile(cookies).get();
//        System.out.printf("Active user: %s %s \n", activeUser.getFirstName(), activeUser.getLastName());

        Profile userProfile = null;
        List<Profile> profilesList = new ArrayList<>();
        String sql = """
                SELECT * 
                FROM users u
                WHERE u.user_id IN (
                SELECT r.user_whom_id FROM reactions r
                WHERE r.user_who_id = ? AND reaction = 1 AND r.user_whom_id IN 
                (SELECT r.user_who_id FROM reactions r WHERE (r.user_whom_id = ? AND reaction = 1))
                );
                  """;
        try {
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, activeUser.getId());
            stmt.setInt(2, activeUser.getId());
            ResultSet res = stmt.executeQuery();
            while (res.next()) {
                int id = res.getInt("user_id");
                String name = res.getString("first_name");
                String surname = res.getString("last_name");
                String userEmail = res.getString("email");
                String picUrl = res.getString("pic_url");
                String picUrlAvatar = res.getString("pic_url_avatar");
                String gender = res.getString("gender");
                String lastLoginDate = res.getString("last_login_date");
                String occupation = res.getString("occupation");
                userProfile = new Profile(id, userEmail, name, surname, picUrl, picUrlAvatar, gender, lastLoginDate, occupation);
                profilesList.add(userProfile);
            }

        } catch (SQLException ex) {
            throw new UsersException("An error occurred when executing method getUserLikedProfiles().");
        }
        return Optional.of(profilesList);
    }

    @Override
    public Optional<Profile> getUserProfileRandomly(Cookie[] cookies) throws UsersException {
        Optional<Profile> randomProfile = Optional.empty();
        String sql = """
                    SELECT * FROM users u\s
                    WHERE u.user_id NOT IN (SELECT r.user_whom_id FROM reactions r WHERE r.user_who_id = ?)
                    AND gender != ? LIMIT 1;
                """;

        Profile activeUser = getActiveUserProfile(cookies).get();

        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, activeUser.getId());
            ps.setString(2, activeUser.getGender());
            ResultSet res = ps.executeQuery();

            randomProfile = createUserProfile(res);
        } catch (SQLException ex) {
            throw new UsersException("An error occurred when executing method getUserProfileRandomly().");
        }
        return randomProfile;
    }

    @Override
    public Profile getUserProfileByEmail(String email) throws UsersException {
        Profile userProfile = null;

        String sql = """
                    SELECT *
                    FROM users u
                    WHERE u.email = ?
                """;
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            ResultSet res = stmt.executeQuery();
            userProfile = createUserProfile(res).get();
        } catch (SQLException ex) {
            throw new UsersException("An error occurred when executing method getUserProfileByEmail().");
        }
        return userProfile;
    }

    @Override
    public Profile getUserProfileById(int id) throws UsersException {
        Profile userProfile = null;

        String sql = """
                    SELECT *
                    FROM users u
                    WHERE u.user_id = ?
                """;
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet res = stmt.executeQuery();
            userProfile = createUserProfile(res).get();
        } catch (SQLException ex) {
            throw new UsersException("An error occurred when executing method getUserProfileById().");
        }
        return userProfile;
    }

    private void saveUserLoginDate(String email) {
        Profile activeUser = null;
        try {
            activeUser = getUserProfileByEmail(email);
        } catch (UsersException ex) {
            ex.printStackTrace();
        }


        Date currentDateTime = Calendar.getInstance().getTime();
        Timestamp loginDateTime = new Timestamp(currentDateTime.getTime());
        String sqlUpdateLogTime = """
                UPDATE users SET last_login_date = ? WHERE user_id = ?
                """;
        try (PreparedStatement ps = conn.prepareStatement(sqlUpdateLogTime)) {
            ps.setTimestamp(1, loginDateTime);
            ps.setInt(2, activeUser.getId());
            ps.executeUpdate();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    private Optional<Profile> createUserProfile(ResultSet res) throws SQLException {
        Profile userProfile = null;
        if (res.next()) {
            int id = res.getInt("user_id");
            String name = res.getString("first_name");
            String surname = res.getString("last_name");
            String userEmail = res.getString("email");
            String picUrl = res.getString("pic_url");
            String picUrlAvatar = res.getString("pic_url_avatar");
            String gender = res.getString("gender");
            String lastLoginDate = res.getString("last_login_date");
            String occupation = res.getString("occupation");
            userProfile = new Profile(id, userEmail, name, surname, picUrl, picUrlAvatar, gender, lastLoginDate, occupation);
        }
        return userProfile == null ? Optional.empty() : Optional.of(userProfile);
    }

    private String getUserPasswordByEmail(String userEmail) {
        String userPassword = "";
        String sql = """
                    SELECT password
                    FROM users u
                    WHERE u.email = ?
                """;
        try {
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, userEmail);
            ResultSet res = stmt.executeQuery();
            while (res.next()) {
                userPassword = res.getString("password");
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return userPassword;
    }
}

