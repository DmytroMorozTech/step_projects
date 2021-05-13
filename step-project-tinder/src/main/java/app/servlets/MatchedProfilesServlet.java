package app.servlets;

import app.controller.UsersController;
import app.domain.Profile;
import lombok.SneakyThrows;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


public class MatchedProfilesServlet extends HttpServlet {
    private final UsersController uc;

    public MatchedProfilesServlet(UsersController uc) {
        this.uc = uc;
    }

    @SneakyThrows
    @Override
    protected void doGet(HttpServletRequest rq, HttpServletResponse rs) throws IOException {
        TemplateEngine engine = TemplateEngine.folder("html");
        HashMap<String, Object> data = new HashMap<>();
        Optional<List<Profile>> userLikedProfiles = uc.getUserLikedProfiles(rq.getCookies());

        if (userLikedProfiles.isPresent() && userLikedProfiles.get().size() > 0) {
            List<Profile> profiles = userLikedProfiles.get();
            data.put("profiles", profiles);
            data.put("nolikes", false);
        } else {
            data.put("nolikes", true);
//            System.out.println("NO PROFILES WERE FOUND!");
        }
        engine.render("people-list.ftl", data, rs);
    }
}
