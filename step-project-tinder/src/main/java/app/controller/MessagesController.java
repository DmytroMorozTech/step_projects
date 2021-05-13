package app.controller;

import app.contract.MessagesDAO;
import app.domain.Message;
import app.service.MessagesService;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;

public class MessagesController implements MessagesDAO {
    private MessagesService messagesService;

    public MessagesController(Connection conn) {
        this.messagesService = new MessagesService(conn);
    }

    @Override
    public Optional<List<Message>> getMessages4Chat(int userWhoId, int userWhomId) {
        return messagesService.getMessages4Chat(userWhoId, userWhomId);
    }

    @Override
    public boolean sendMessage(int userWhoId, int userWhomId, String textOfMessage) {
        return messagesService.sendMessage(userWhoId, userWhomId, textOfMessage);
    }
}
