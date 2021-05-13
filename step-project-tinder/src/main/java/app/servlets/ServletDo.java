package app.servlets;

import app.controller.UsersController;
import app.service.CookieUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static app.service.CookieUtil.COOKIE_NAME;

public class ServletDo extends HttpServlet {

    private final UsersController uc;

    public ServletDo(UsersController uc) {
        this.uc = uc;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String result = CookieUtil.findMyCookie(COOKIE_NAME, req.getCookies())
                .flatMap(c -> uc.checkLogged(c.getValue()))
                .map(userName -> String.format("A logged in user was found (email: `%s` )", userName))
                .orElse("no users logged in");

        try (PrintWriter w = resp.getWriter()) {
            w.println(result);
        }
    }
}
