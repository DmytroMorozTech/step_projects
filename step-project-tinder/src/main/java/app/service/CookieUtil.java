package app.service;

import javax.servlet.http.Cookie;
import java.util.Arrays;
import java.util.Optional;

public class CookieUtil {
    public static final String COOKIE_NAME = "UID";

    public static Optional<Cookie> findMyCookie(String name, Cookie[] cookies) {
        if (cookies == null) return Optional.empty();
        return Arrays.stream(cookies)
                .filter(x -> x.getName().equals(COOKIE_NAME))
                .findFirst();
    }
}
