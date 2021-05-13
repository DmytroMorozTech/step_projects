CREATE TABLE `tinder`.`users`
(
    `user_id`         INT          NOT NULL AUTO_INCREMENT,
    `first_name`      VARCHAR(45)  NOT NULL,
    `last_name`       VARCHAR(45) NULL DEFAULT NULL,
    `email`           VARCHAR(45)  NOT NULL,
    `pic_url`         VARCHAR(500) NOT NULL,
    `pic_url_avatar`  VARCHAR(500) NOT NULL,
    `gender`          VARCHAR(20)  NOT NULL,
    `password`        VARCHAR(50)  NOT NULL,
    `last_login_date` TIMESTAMP NULL DEFAULT NULL,
    `occupation`      VARCHAR(45)  NOT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE
);