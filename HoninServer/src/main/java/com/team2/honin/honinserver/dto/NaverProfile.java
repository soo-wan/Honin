package com.team2.honin.honinserver.dto;

import lombok.Data;

@Data
public class NaverProfile {
    private String resultcode;
    private String message;
    private Response response;

    @Data
    public static class Response {
        private String id;
        private String email;
        private String nickname;
        private String profile_image;
        private String age;
        private String gender;
        private String name;
        private String birthday;

        public String getId() {
            return id;
        }

        public String getEmail() {
            return email;
        }

        public String getNickname() {
            return nickname;
        }

    }

}

