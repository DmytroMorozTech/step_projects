package app.controller;

import app.contract.UsersDAO;
import app.domain.Profile;
import app.service.UsersService;

import javax.servlet.http.Cookie;
import java.sql.Connection;
import java.util.List;
import java.util.Optional;

public class UsersController implements UsersDAO {
    private UsersService usersService;

    public UsersController(Connection conn) {
        this.usersService = new UsersService(conn);
    }

    @Override
    public String generateId() {
        return usersService.generateId();
    }

    @Override
    public Optional<Profile> getActiveUserProfile(Cookie[] cookies) {
        return usersService.getActiveUserProfile(cookies);
    }

    @Override
    public Optional<String> logout(String key) {
        return usersService.logout(key);
    }

    @Override
    public boolean checkPassword(String userEmail, String pass) {
        return usersService.checkPassword(userEmail, pass);
    }

    @Override
    public Optional<String> checkAndLogin(String userEmail, String pass) {
        return usersService.checkAndLogin(userEmail, pass);
    }

    @Override
    public Optional<String> checkLogged(String key) {
        return usersService.checkLogged(key);
    }

    @Override
    public void saveUserRateData(Cookie[] cookies, String userRate, Profile userProfile) {
        usersService.saveUserRateData(cookies, userRate, userProfile);
    }

    @Override
    public Optional<List<Profile>> getUserLikedProfiles(Cookie[] cookies) {
        return usersService.getUserLikedProfiles(cookies);
    }

    @Override
    public Optional<Profile> getUserProfileRandomly(Cookie[] cookies) {
        return usersService.getUserProfileRandomly(cookies);
    }

    @Override
    public Profile getUserProfileByEmail(String email) {
        return usersService.getUserProfileByEmail(email);
    }

    @Override
    public Profile getUserProfileById(int id) {
        return usersService.getUserProfileById(id);
    }
}
