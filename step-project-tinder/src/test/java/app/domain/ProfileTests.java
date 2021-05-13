package app.domain;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.text.ParseException;

public class ProfileTests {
    private static Profile profile1;
    private static Profile profile2;

    @BeforeEach
    void getTestingProfile() {

        profile1 = new Profile(1,
                "mt@gmail.com",
                "Mike",
                "Tyson",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/1200px-Mike_Tyson_2019_by_Glenn_Francis.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/1200px-Mike_Tyson_2019_by_Glenn_Francis.jpg",
                "male",
                "2021-01-01 15:34:21",
                "boxer");

        profile2 = new Profile(2,
                "mp@gmail.com",
                "Manny",
                "Pacquiao",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Manny_Pacquiao_2010.jpg/220px-Manny_Pacquiao_2010.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Manny_Pacquiao_2010.jpg/220px-Manny_Pacquiao_2010.jpg",
                "male",
                "2021-02-05 18:01:51",
                "boxer");
    }

    @Test
    void getId() {
        System.out.println(">>>>>>>>>> TESTING getId() METHOD <<<<<<<<<<");

        //Given
        int givenId1 = 1;
        int givenId2 = 2;

        //When
        int id1 = profile1.getId();
        int id2 = profile2.getId();

        //Then
        Assertions.assertEquals(givenId1, id1);
        Assertions.assertEquals(givenId2, id2);
        Assertions.assertNotEquals(givenId1, id2);
    }

    @Test
    void getEmail() {
        System.out.println(">>>>>>>>>> TESTING getEmail() METHOD <<<<<<<<<<");

        //Given
        String givenEmail1 = "mt@gmail.com";
        String givenEmail2 = "mp@gmail.com";

        //When
        String email1 = profile1.getEmail();
        String email2 = profile2.getEmail();

        //Then
        Assertions.assertEquals(givenEmail1, email1);
        Assertions.assertEquals(givenEmail2, email2);
        Assertions.assertNotEquals(givenEmail1, email2);
    }

    @Test
    void getFirstName(){
        System.out.println(">>>>>>>>>> TESTING getFirstName() METHOD <<<<<<<<<<");

        //Given
        String givenName1 = "Mike";
        String givenName2 = "Manny";

        //When
        String name1 = profile1.getFirstName();
        String name2 = profile2.getFirstName();

        //Then
        Assertions.assertEquals(givenName1, name1);
        Assertions.assertEquals(givenName2, name2);
        Assertions.assertNotEquals(givenName1, name2);
    }

    @Test
    void getLastName(){
        System.out.println(">>>>>>>>>> TESTING getLastName() METHOD <<<<<<<<<<");

        //Given
        String givenSurname1 = "Tyson";
        String givenSurname2 = "Pacquiao";

        //When
        String surname1 = profile1.getLastName();
        String surname2 = profile2.getLastName();

        //Then
        Assertions.assertEquals(givenSurname1, surname1);
        Assertions.assertEquals(givenSurname2, surname2);
        Assertions.assertNotEquals(givenSurname1, surname2);
    }

    @Test
    void getPicAddress() {
        System.out.println(">>>>>>>>>> TESTING getPicAddress() METHOD <<<<<<<<<<");

        //Given
        String givenPic1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/1200px-Mike_Tyson_2019_by_Glenn_Francis.jpg";
        String givenPic2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Manny_Pacquiao_2010.jpg/220px-Manny_Pacquiao_2010.jpg";

        //When
        String pic1 = profile1.getPicAddress();
        String pic2 = profile2.getPicAddress();

        //Then
        Assertions.assertEquals(givenPic1, pic1);
        Assertions.assertEquals(givenPic2, pic2);
        Assertions.assertNotEquals(givenPic1, pic2);
    }

    @Test
    void getPicUrlAvatar() {
        System.out.println(">>>>>>>>>> TESTING getPicUrlAvatar() METHOD <<<<<<<<<<");

        //Given
        String givenAvatarPic1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/1200px-Mike_Tyson_2019_by_Glenn_Francis.jpg";
        String givenAvatarPic2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Manny_Pacquiao_2010.jpg/220px-Manny_Pacquiao_2010.jpg";

        //When
        String avatar1 = profile1.getPicUrlAvatar();
        String avatar2 = profile2.getPicUrlAvatar();

        //Then
        Assertions.assertEquals(givenAvatarPic1, avatar1);
        Assertions.assertEquals(givenAvatarPic2, avatar2);
        Assertions.assertNotEquals(givenAvatarPic1, avatar2);
    }

    @Test
    void getGender(){
        System.out.println(">>>>>>>>>> TESTING getGender() METHOD <<<<<<<<<<");

        //Given
        String givenGender1 = "male";
        String givenGender2 = "male";

        //When
        String gender1 = profile1.getGender();
        String gender2 = profile2.getGender();

        //Then
        Assertions.assertEquals(givenGender1, gender1);
        Assertions.assertEquals(givenGender2, gender2);
    }

    @Test
    void getOccupation(){
        System.out.println(">>>>>>>>>> TESTING getOccupation() METHOD <<<<<<<<<<");

        //Given
        String givenOccupation1 = "boxer";
        String givenOccupation2 = "boxer";

        //When
        String occupation1 = profile1.getOccupation();
        String occupation2 = profile2.getOccupation();

        //Then
        Assertions.assertEquals(givenOccupation1, occupation1);
        Assertions.assertEquals(givenOccupation2, occupation2);
    }

    @Test
    void showLastLoginTime() throws ParseException {
        System.out.println(">>>>>>>>>> TESTING showLastLoginTime() METHOD <<<<<<<<<<");

        //Given
        String givenLoginTime1 = "01/01/2021";
        String givenLoginTime2 = "05/02/2021";

        //When
        String loginTime1 = profile1.showLastLoginTime();
        String loginTime2 = profile2.showLastLoginTime();

        //Then
        Assertions.assertEquals(givenLoginTime1, loginTime1);
        Assertions.assertEquals(givenLoginTime2, loginTime2);
    }

    @Test
    void getLastLoginPeriod() throws ParseException {
        System.out.println(">>>>>>>>>> TESTING getLastLoginPeriod() METHOD <<<<<<<<<<");

        //Given
        String givenLoginPeriod1 = "Was long ago";
        String givenLoginPeriod2 = "21 days ago";

        //When
        String loginPeriod1 = profile1.getLastLoginPeriod();
        String loginPeriod2 = profile2.getLastLoginPeriod();

        //Then
        Assertions.assertEquals(givenLoginPeriod1, loginPeriod1);
        Assertions.assertEquals(givenLoginPeriod2, loginPeriod2);
    }
}



