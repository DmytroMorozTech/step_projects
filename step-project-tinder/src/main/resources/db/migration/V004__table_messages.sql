CREATE TABLE `tinder`.`messages`
(
    `message_id`   INT          NOT NULL AUTO_INCREMENT,
    `user_who_id`  INT          NOT NULL,
    `user_whom_id` INT          NOT NULL,
    `text`         VARCHAR(300) NOT NULL,
    `sent_at_time` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`message_id`)
)