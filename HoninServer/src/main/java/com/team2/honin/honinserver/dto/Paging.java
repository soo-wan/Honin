package com.team2.honin.honinserver.dto;

import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Data
public class Paging {
    private int page = 1;
    private int startNum;
    private int displayRow = 6;

    public void calPaging(){
        this.startNum = (page - 1) * displayRow + 1;
    }

}
