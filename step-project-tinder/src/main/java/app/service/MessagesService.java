package app.service;

import app.contract.MessagesDAO;
import app.domain.Message;
import app.exceptions.MessagesException;
import app.repos.MySQL_MessagesDAO;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;

public class MessagesService implements MessagesDAO {
    private MySQL_MessagesDAO messagesDAO;

    public MessagesService(Connection conn) {
        this.messagesDAO = new MySQL_MessagesDAO(conn);
    }


    @Override
    public Optional<List<Message>> getMessages4Chat(int userWhoId, int userWhomId) {
        try {
            return messagesDAO.getMessages4Chat(userWhoId, userWhomId);

        } catch (MessagesException ex) {
            LoggerService.error("MessagesException: " + ex.getMessage());
            return Optional.empty();
        }
    }

    @Override
    public boolean sendMessage(int userWhoId, int userWhomId, String textOfMessage) {
        try {
            return messagesDAO.sendMessage(userWhoId, userWhomId, textOfMessage);

        } catch (MessagesException ex) {
            LoggerService.error("MessagesException: " + ex.getMessage());
            return false;
        }
    }
}
