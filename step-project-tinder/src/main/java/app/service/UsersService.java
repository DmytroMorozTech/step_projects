package app.service;

import app.contract.UsersDAO;
import app.domain.Profile;
import app.exceptions.UsersException;
import app.repos.MySQL_UsersDAO;

import javax.servlet.http.Cookie;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public class UsersService implements UsersDAO {
    private MySQL_UsersDAO usersDAO;

    public UsersService(Connection conn) {
        this.usersDAO = new MySQL_UsersDAO(conn);
    }

    @Override
    public String generateId() {
        return usersDAO.generateId();
    }

    @Override
    public Optional<Profile> getActiveUserProfile(Cookie[] cookies) {
        try {
            return usersDAO.getActiveUserProfile(cookies);
        } catch (UsersException ex) {
            LoggerService.error("UsersException: An error occurred when executing " +
                    "method getActiveUserProfile().");
            return Optional.empty();
        }
    }

    @Override
    public Optional<String> logout(String key) {
        return usersDAO.logout(key);
    }

    @Override
    public boolean checkPassword(String userEmail, String pass) {
        return usersDAO.checkPassword(userEmail, pass);
    }

    @Override
    public Optional<String> checkAndLogin(String userEmail, String pass) {
        return usersDAO.checkAndLogin(userEmail, pass);
    }

    @Override
    public Optional<String> checkLogged(String key) {
        return usersDAO.checkLogged(key);
    }

    @Override
    public void saveUserRateData(Cookie[] cookies, String userRate, Profile userProfile) {
        try {
            usersDAO.saveUserRateData(cookies, userRate, userProfile);
        } catch (UsersException ex) {
            LoggerService.error("UsersException: " + ex.getMessage());
        }
    }

    @Override
    public Optional<List<Profile>> getUserLikedProfiles(Cookie[] cookies) {
        try {
            return usersDAO.getUserLikedProfiles(cookies);
        } catch (UsersException ex) {
            LoggerService.error("UsersException: " + ex.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public Optional<Profile> getUserProfileRandomly(Cookie[] cookies) {
        try {
            return usersDAO.getUserProfileRandomly(cookies);
        } catch (UsersException ex) {
            LoggerService.error("UsersException: " + ex.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public Profile getUserProfileByEmail(String email) {
        try {
            return usersDAO.getUserProfileByEmail(email);
        } catch (UsersException ex) {
            LoggerService.error("UsersException: " + ex.getMessage());
            return null;
        }
    }

    @Override
    public Profile getUserProfileById(int id) {
        try {
            return usersDAO.getUserProfileById(id);
        } catch (UsersException ex) {
            LoggerService.error("UsersException: " + ex.getMessage());
            return null;
        }
    }
}
