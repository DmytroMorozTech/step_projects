package app.contract;

import app.domain.Profile;
import app.exceptions.UsersException;

import javax.servlet.http.Cookie;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface UsersDAO {
    String generateId();

    Optional<Profile> getActiveUserProfile(Cookie[] cookies) throws UsersException;

    Optional<String> logout(String key);

    boolean checkPassword(String userEmail, String pass) throws SQLException;

    Optional<String> checkAndLogin(String userEmail, String pass);

    Optional<String> checkLogged(String key);

    void saveUserRateData(Cookie[] cookies, String userRate, Profile userProfile) throws UsersException;

    Optional<List<Profile>> getUserLikedProfiles(Cookie[] cookies) throws UsersException;

    Optional<Profile> getUserProfileRandomly(Cookie[] cookies) throws UsersException;

    Profile getUserProfileByEmail(String email) throws UsersException;

    Profile getUserProfileById(int id) throws UsersException;

}
