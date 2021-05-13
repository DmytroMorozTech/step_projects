CREATE TABLE `tinder`.`reactions`
(
    `reactions_id` INT         NOT NULL AUTO_INCREMENT,
    `user_who_id`  INT         NOT NULL,
    `user_whom_id` INT         NOT NULL,
    `reaction`     VARCHAR(45) NULL DEFAULT NULL,
    PRIMARY KEY (`reactions_id`)
);