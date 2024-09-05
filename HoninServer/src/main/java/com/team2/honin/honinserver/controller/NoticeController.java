package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.dto.NCareerResponseDTO;
import com.team2.honin.honinserver.dto.NPolicyResponseDTO;
import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService ns;

//    @Autowired
//    private S3UploadService sus;
//
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
//    @PostMapping("/fileupload")
//    public HashMap<String, Object> fileup( @RequestParam("image") MultipartFile file){
//
//        HashMap<String, Object> result = new HashMap<String, Object>();
//
//        try {
//            // 서비스단의 파일 업로드 메서드를 호출해서 파일 저장
//            String uploadFilePathName = sus.saveFile(file);
//
//            result.put("saveFileNames", "");
//        } catch (IllegalStateException | IOException e) {
//            e.printStackTrace();
//        }
//        return result;
//    }

    @GetMapping("/getNcareer/{ncnum}")
    public HashMap<String, Object> getNcareer(@PathVariable("ncnum") int ncnum) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("ncareer", ns.getNcareer(ncnum));
        return result;
    }

    @GetMapping("/getNpolicy/{npnum}")
    public HashMap<String, Object> getNpolicy(@PathVariable("npnum") int npnum) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("npolicy", ns.getNpolicy(npnum));
        return result;
    }

    @GetMapping("/updateReadCount/{ncnum}")
    public void updateReadCount(@PathVariable("ncnum") int ncnum) {
        ns.updateReadCount(ncnum);
    }

    @GetMapping("/updateReadCountNP/{npnum}")
    public void updateReadCountNP(@PathVariable("npnum") int npnum) {
        ns.updateReadCountNP(npnum);
    }

    @GetMapping("/getNpolicyList/{page}")
    public Map<String, Object> getNpolicyList(@PathVariable("page") int page) {
        Paging paging = new Paging();
        paging.setPage(page);
        paging.calPaging();

        Page<NPolicyResponseDTO> result = ns.getNpolicyList(paging);

        Map<String, Object> response = new HashMap<>();
        response.put("npolicyList", result.getContent());
        response.put("totalPages", result.getTotalPages());
        response.put("totalElements", result.getTotalElements());
        response.put("currentPage", result.getNumber() + 1); // 페이지 번호는 0부터 시작하므로 1을 추가

        return response;
    }

    @GetMapping("/getNcareerList/{page}")
    public Map<String, Object> getNcareerList(@PathVariable("page") int page) {
        Paging paging = new Paging();
        paging.setPage(page);
        paging.calPaging();

        Page<NCareerResponseDTO> result = ns.getNCareerList(paging);

        Map<String, Object> response = new HashMap<>();
        response.put("ncareerList", result.getContent());
        response.put("totalPages", result.getTotalPages());
        response.put("totalElements", result.getTotalElements());
        response.put("currentPage", result.getNumber() + 1); // 페이지 번호는 0부터 시작하므로 1을 추가

        return response;
    }

}
