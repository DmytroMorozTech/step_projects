package app.servlets;

import app.controller.UsersController;
import app.domain.Profile;
import app.service.CookieUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;

import static app.service.CookieUtil.COOKIE_NAME;


public class ServletLogout extends HttpServlet {

    private final UsersController uc;

    public ServletLogout(UsersController uc) {
        this.uc = uc;
    }

    @Override
    protected void doGet(HttpServletRequest rq, HttpServletResponse rs) throws ServletException, IOException {
        String result = CookieUtil.findMyCookie(COOKIE_NAME, rq.getCookies())
                .flatMap(cookie -> {
                    cookie.setMaxAge(0);
                    // resp -> browser
                    rs.addCookie(cookie);
                    // auth module
                    return uc.logout(cookie.getValue());
                })
                .map(userEmail -> {
                    String s = "";
                    Profile userProfile = uc.getUserProfileByEmail(userEmail);
                    if (userProfile != null) {
                        String fullName = userProfile.getFullName();
                        s = String.format("%s successfully logged out.", fullName);
                    }
                    return s;
                })
                .orElse("No user logged in");


        TemplateEngine engine = TemplateEngine.folder("html");
        HashMap<String, Object> data = new HashMap<>();

        data.put("logoutResult", result);
        engine.render("logout.ftl", data, rs);
    }
}
