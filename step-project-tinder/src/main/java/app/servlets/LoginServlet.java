package app.servlets;

import app.controller.UsersController;
import app.service.LoggerService;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

import static app.service.CookieUtil.COOKIE_NAME;


public class LoginServlet extends HttpServlet {

    private final UsersController uc;

    public LoginServlet(UsersController uc) {
        this.uc = uc;
    }

    /**
     * draw form
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (ServletOutputStream os = resp.getOutputStream()) {
            Files.copy(Paths.get("html", "login.html"), os);
        }
    }

    /**
     * process form & set cookie
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (PrintWriter w = resp.getWriter()) {

            boolean rememberMe = req.getParameter("rememberMe") != null ? true : false;
//            System.out.printf("rememberMe status: %b \n", rememberMe);

            String result =
                    Optional.ofNullable(req.getParameter("inputEmail"))
                            .flatMap(user ->
                                    Optional.ofNullable(req.getParameter("inputPassword"))
                                            .flatMap(pass ->
                                                    uc.checkAndLogin(user, pass)
                                                            .map(key -> {
                                                                LoggerService.info("User with email " + user + " successfully logged in");
                                                                Cookie cookie = new Cookie(COOKIE_NAME, key);
                                                                if (rememberMe) cookie.setMaxAge(60 * 60 * 24 * 5);
                                                                // we set the max age for Cookie to be 5 days.
                                                                // so that browser would remember this user for 5 days, unless they logout.
                                                                resp.addCookie(cookie);
                                                                return key;
                                                            })
                                                            .map(key -> {
                                                                try {
                                                                    resp.sendRedirect(req.getContextPath() + "/app/users");
                                                                } catch (IOException e) {
                                                                    e.printStackTrace();
                                                                }
                                                                return key;
                                                            })
                                            )
                            ).orElse("wrong user/pass combination");
            LoggerService.info("wrong user/pass combination");
            w.println(result);
        }
    }
}
