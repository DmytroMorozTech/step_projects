package app.servlets;

import app.controller.UsersController;
import app.domain.Profile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Optional;

public class UsersServlet extends HttpServlet {

    private final UsersController uc;
    private Optional<Profile> userProfile;

    public UsersServlet(UsersController uc) {
        this.uc = uc;
    }

    @Override
    protected void doGet(HttpServletRequest rq, HttpServletResponse rs) throws IOException {
        try {
            displayNextProfile(rq, rs);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest rq, HttpServletResponse rs) throws ServletException, IOException {
        try {
            saveUserReaction(rq, userProfile.get());
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        try {
            displayNextProfile(rq, rs);
        } catch (SQLException | IOException throwables) {
            throwables.printStackTrace();
        }
    }

    private void saveUserReaction(HttpServletRequest rq, Profile userProfile) throws SQLException {
        String rate = rq.getParameter("like");
        uc.saveUserRateData(rq.getCookies(), rate, userProfile);
    }

    private void displayNextProfile(HttpServletRequest rq, HttpServletResponse rs) throws SQLException, IOException {
        TemplateEngine engine = TemplateEngine.folder("html");
        HashMap<String, Object> data = new HashMap<>();
        userProfile = uc.getUserProfileRandomly(rq.getCookies());
        if (userProfile.isEmpty()) {
            rs.sendRedirect("/app/liked");
        } else {
            data.put("profiles", userProfile.get());
            engine.render("profile.ftl", data, rs);
        }
    }

}


