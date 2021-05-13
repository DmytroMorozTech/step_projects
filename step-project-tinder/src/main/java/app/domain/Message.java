package app.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Message {

    private final int messageId;
    private final int userWhoId;
    private final int userWhomId;
    private final String text;
    private final String sentAtTime;

    public Message(int messageId, int userWhoId, int userWhomId, String text, String sentAtTime) {
        this.messageId = messageId;
        this.userWhoId = userWhoId;
        this.userWhomId = userWhomId;
        this.text = text;
        this.sentAtTime = sentAtTime;
    }

    public int getMessageId() {
        return messageId;
    }

    public int getUserWhoId() {
        return userWhoId;
    }

    public int getUserWhomId() {
        return userWhomId;
    }

    public String getText() {
        return text;
    }

    public String getSentAtTime() {
        return sentAtTime;
    }

    public String getSentAtTimeFormatted() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(sentAtTime, dtf);

        Locale englishLocale = new Locale("en", "EN");
        DateTimeFormatter shortDtf = DateTimeFormatter.ofPattern("MMM dd, yyyy, HH:mm a", englishLocale);
        String formattedDateTime = shortDtf.format(dateTime);

        return formattedDateTime;
//      Input:              2021-03-01 09:35:13
//      Expected output:    Mar 01,2021, 9:35AM
    }

}
