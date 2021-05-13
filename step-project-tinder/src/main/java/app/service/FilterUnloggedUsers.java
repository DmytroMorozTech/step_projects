package app.service;

import app.contract.HttpFilter;
import app.controller.UsersController;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public class FilterUnloggedUsers implements HttpFilter {
    private UsersController uc;
    private int counter = 0;

    public FilterUnloggedUsers(UsersController uc) {
        this.uc = uc;
    }

    @Override
    public void doHttpFilter(HttpServletRequest rq, HttpServletResponse rs, FilterChain chain) throws IOException, ServletException {
//        System.out.println("FILTER AUTH WAS LAUNCHED!");
//        counter++;

        Cookie[] cookies = rq.getCookies();
        Optional<Cookie> myCookie = CookieUtil.findMyCookie(CookieUtil.COOKIE_NAME, cookies);

//        System.out.println("*******************************************");
//        System.out.printf("CALL NO: %d \n", counter);
//        System.out.println(myCookie.map(Cookie::getValue).orElse("Cookie UID doesn't exist at user's side."));

        boolean cookieIsVerified = myCookie.flatMap(c -> uc.checkLogged(c.getValue())).isPresent();
//        System.out.printf("Cookie is present: %s \n", cookieIsVerified);
//        System.out.println("*******************************************");

        if (cookieIsVerified) {
            chain.doFilter(rq, rs);
        } else {
            rs.sendRedirect("/login");
        }
    }
}
