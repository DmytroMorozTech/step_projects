package app.domain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Profile {

    private final int id;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String picAddress;
    private final String picUrlAvatar;
    private final String gender;
    private final String lastLoginDate;
    private final String occupation;

    public Profile(int id, String email, String firstName, String lastName, String picAddress, String picUrlAvatar, String gender, String loginDate, String occupation) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.picAddress = picAddress;
        this.picUrlAvatar = picUrlAvatar;
        this.gender = gender;
        this.lastLoginDate = loginDate;
        this.occupation = occupation;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFullName() {
        return String.format("%s %s", firstName, lastName);
    }

    public String getPicAddress() {
        return picAddress;
    }

    public String getPicUrlAvatar() {
        return picUrlAvatar;
    }

    public String getGender() {
        return gender;
    }

    public Date getLastLoginFullTime() throws ParseException {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(lastLoginDate);
    }

    public String getOccupation() {
        return occupation;
    }

    public String showLastLoginTime() throws ParseException {
        return new SimpleDateFormat("dd/MM/yyyy").format(getLastLoginFullTime());
    }

    public String getLastLoginPeriod() throws ParseException {
        String ll;
        Date dateNow = Calendar.getInstance().getTime();
        long lastUserLoginPeriod = dateNow.getTime() - getLastLoginFullTime().getTime();
        int lastLoginSeconds = (int) (lastUserLoginPeriod / (1000));
        if (lastLoginSeconds <= 60) {
            ll = "less than a minute ago";
        } else if (lastLoginSeconds <= 3600) {
            int lastLoginMinutes = (lastLoginSeconds / 60) % 60;
            if (lastLoginMinutes == 1)
                ll = lastLoginMinutes + " minute ago";
            else ll = lastLoginMinutes + " minutes ago";
        } else if (lastLoginSeconds <= 86400) {
            int lastLoginHours = (lastLoginSeconds / 60 / 60) % 24;
            if (lastLoginHours == 1) ll = lastLoginHours + " hour ago";
            else ll = lastLoginHours + " hours ago";
        } else if (lastLoginSeconds <= 2592000) {
            int lastLoginDays = (lastLoginSeconds / 60 / 60 / 24) % 30;
            if (lastLoginDays == 1) ll = lastLoginDays + " day ago";
            else ll = lastLoginDays + " days ago";
        } else ll = "Was long ago";
        return ll;
    }
}
