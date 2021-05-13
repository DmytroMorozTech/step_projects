package app.contract;

import app.domain.Message;
import app.exceptions.MessagesException;

import java.util.List;
import java.util.Optional;

public interface MessagesDAO {
    Optional<List<Message>> getMessages4Chat(int userWhoId, int userWhomId) throws MessagesException;

    boolean sendMessage(int userWhoId, int userWhomId, String textOfMessage) throws MessagesException;
}
