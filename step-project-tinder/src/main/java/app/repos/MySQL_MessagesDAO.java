package app.repos;

import app.contract.MessagesDAO;
import app.domain.Message;
import app.exceptions.MessagesException;

import java.sql.*;
import java.util.*;
import java.util.stream.Collectors;

public class MySQL_MessagesDAO implements MessagesDAO {

    private final Connection conn;

    public MySQL_MessagesDAO(Connection conn) {
        this.conn = conn;
    }

    @Override
    public Optional<List<Message>> getMessages4Chat(int userWhoId, int userWhomId) throws MessagesException {
        List<Message> messagesList = new ArrayList<>();
        Message msg;

        String sql = """
                    SELECT *
                    FROM messages m
                    WHERE (m.user_who_id = ? AND m.user_whom_id = ?)
                    OR (m.user_who_id = ? AND m.user_whom_id = ?)
                """;
        try {
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, userWhoId);
            stmt.setInt(2, userWhomId);
            stmt.setInt(3, userWhomId);
            stmt.setInt(4, userWhoId);
            ResultSet res = stmt.executeQuery();
            while (res.next()) {
                int messageId = res.getInt("message_id");
                int userWhoIdDB = res.getInt("user_who_id");
                int userWhomIdDB = res.getInt("user_whom_id");
                String text = res.getString("text");
                String sentAtTime = res.getString("sent_at_time");

                msg = new Message(messageId, userWhoIdDB, userWhomIdDB, text, sentAtTime);
                messagesList.add(msg);
            }
        } catch (SQLException ex) {
            throw new MessagesException("An error occurred when executing method getMessages4Chat().");
        }

        if (messagesList.size() > 0) {
            List<Message> sortedMessages = messagesList.stream()
                    .sorted(Comparator.comparing(Message::getSentAtTime))
                    .collect(Collectors.toList());
            return Optional.of(sortedMessages);
        }
        // here we are sorting messages by the time they were sent at.

        return Optional.empty();
    }

    @Override
    public boolean sendMessage(int userWhoId, int userWhomId, String textOfMessage) throws MessagesException {
        String sql = """
                INSERT INTO messages(user_who_id, user_whom_id, text) VALUES(?, ?, ?);
                """;
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, userWhoId);
            stmt.setInt(2, userWhomId);
            stmt.setString(3, textOfMessage);
            stmt.executeUpdate();
            return true;

        } catch (SQLException ex) {
            throw new MessagesException("An error occurred when executing method sendMessage().");
        }
    }
}

