package app.servlets;

import app.controller.MessagesController;
import app.controller.UsersController;
import app.domain.Message;
import app.domain.Profile;
import lombok.SneakyThrows;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class MessagesServlet extends HttpServlet {

    private final UsersController uc;
    private final MessagesController mc;

    public MessagesServlet(UsersController uc, MessagesController mc) {
        this.uc = uc;
        this.mc = mc;
    }

    @SneakyThrows
    @Override
    protected void doGet(HttpServletRequest rq, HttpServletResponse rs) {

        Profile userWhoProfile = uc.getActiveUserProfile(rq.getCookies()).get();
        int userWhoId = userWhoProfile.getId();

        int userWhomId = Integer.parseInt(rq.getParameter("user_whom_id"));
        Profile userWhomProfile = uc.getUserProfileById(userWhomId);

        Optional<List<Message>> messages4Chat = mc.getMessages4Chat(userWhoId, userWhomId);
        TemplateEngine engine = TemplateEngine.folder("html");
        HashMap<String, Object> data = new HashMap<>();

        data.put("userWhoId", userWhoId);
        data.put("userWhomId", userWhomId);
        data.put("userWhomFullName", userWhomProfile.getFullName());
        data.put("userWhomAvatarUrl", userWhomProfile.getPicUrlAvatar());
        data.put("userWhoAvatarUrl", userWhoProfile.getPicUrlAvatar());

        if (messages4Chat.isPresent()) {
            List<Message> msgList = messages4Chat.get();

            // here we simply print out the list of found messages to console.
//            for (Message msg : msgList) {
//                System.out.println(msg.getText());
//            }

            data.put("messages", msgList);
            data.put("noMessages", false);
        }
        if (messages4Chat.isEmpty()) {
            data.put("noMessages", true);
//            System.out.println("NO MESSAGES IN THIS CHAT");
        }

        engine.render("chat.ftl", data, rs);
    }


    @SneakyThrows
    @Override
    protected void doPost(HttpServletRequest rq, HttpServletResponse rs) {
        Profile activeUser = uc.getActiveUserProfile(rq.getCookies()).get();
        int userWhoId = activeUser.getId();

        int userWhomId = Integer.parseInt(rq.getParameter("userWhomId"));
        String textOfMessage = rq.getParameter("messageText");
        mc.sendMessage(userWhoId, userWhomId, textOfMessage);
    }

}


