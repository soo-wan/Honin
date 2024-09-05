package com.team2.honin.honinserver.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;

@Log4j2
@RestController
@RequestMapping("/database")
public class DatabaseController {

    /* DB 초기화를 위한 메서드 */
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String INIT_FILE_PATH = "src/main/resources/database/init.sql";
    private static final String VIEW_FILE_PATH = "src/main/resources/database/view.sql";

    @PostMapping("/initDb")
    public HashMap<String, Object> initDb() throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        try {
            // 파일을 읽어와서 각 쿼리문을 실행합니다.
            String sql = Files.readString(Path.of(INIT_FILE_PATH));
            String[] sqlStatements = sql.split(";");  // 쿼리문들을 세미콜론으로 분리

            for (String statement : sqlStatements) {
                if (!statement.trim().isEmpty()) {
                    jdbcTemplate.execute(statement);
                }
            }
            result.put("msg", "데이터 삽입 완료");
            return result;
        } catch (Exception e) {
            throw new Exception("SQL 파일 실행 중 오류 발생: " + e.getMessage(), e);
        }
    }

    @PostMapping("/createView")
    public HashMap<String, Object> createView() throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        try {
            // 파일을 읽어와서 각 쿼리문을 실행합니다.
            String sql = Files.readString(Path.of(VIEW_FILE_PATH));
            String[] sqlStatements = sql.split(";");  // 쿼리문들을 세미콜론으로 분리

            for (String statement : sqlStatements) {
                if (!statement.trim().isEmpty()) {
                    jdbcTemplate.execute(statement);
                }
            }
            result.put("msg", "뷰 생성 완료");
            return result;
        } catch (Exception e) {
            throw new Exception("SQL 파일 실행 중 오류 발생: " + e.getMessage(), e);
        }
    }

    @PostMapping("/resetSchema")
    public HashMap<String, Object> resetSchema() throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        try {
            // 스키마 삭제
            jdbcTemplate.execute("DROP SCHEMA IF EXISTS `honin`;");

            // 스키마 생성
            jdbcTemplate.execute("CREATE SCHEMA `honin` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;");

            result.put("msg", "스키마 초기화 완료");
            return result;
        } catch (Exception e) {
            throw new Exception("스키마 초기화 중 오류 발생: " + e.getMessage(), e);
        }
    }
}
