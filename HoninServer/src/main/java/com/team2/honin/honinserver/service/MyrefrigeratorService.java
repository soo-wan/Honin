package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.MyrefrigeratorRepository;
import com.team2.honin.honinserver.entity.MyFood;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MyrefrigeratorService {

    @Autowired
    MyrefrigeratorRepository mfr;

    public List<MyFood> getMyrefrigeratorList(int page, String nickname) {
        int pageSize = 8;
        int offset = (page - 1) * pageSize;
        return mfr.findByOwner(nickname, offset, pageSize);
    }

    public MyFood getMyrefrigeratorView(int num) {
        Optional<MyFood> optionalMyFood = mfr.findByMfnum(num);
        if (optionalMyFood.isPresent()) {
            MyFood mf = optionalMyFood.get();
            return mf;
        } else {
            return null;
        }
    }

    public void writeMyRefrigerator(MyFood mf) {
        MyFood myfood = new MyFood();
        myfood.setCategory(mf.getCategory());
        myfood.setFname(mf.getFname());
        myfood.setMemo(mf.getMemo());
        myfood.setOwner(mf.getOwner());
        myfood.setImage(mf.getImage());
        myfood.setSavefilename(mf.getSavefilename());
        myfood.setExdate(mf.getExdate());
        mfr.save(myfood);
    }

    public void deleteMyrefrigerator(int mfnum) {
        Optional<MyFood> mf = mfr.findByMfnum(mfnum);
        mfr.delete(mf.get());
    }

    public void updateMyrefrigerator(MyFood mf) {
        Optional<MyFood> optionalMyFood = mfr.findByMfnum(mf.getMfnum());
        if (optionalMyFood.isPresent()) {
            MyFood myfood = optionalMyFood.get();
            myfood.setCategory(mf.getCategory());
            myfood.setFname(mf.getFname());
            myfood.setMemo(mf.getMemo());
            myfood.setOwner(mf.getOwner());
            myfood.setExdate(mf.getExdate());

            if(!mf.getImage().isEmpty()){
                myfood.setImage(mf.getImage());
            }
            if(!mf.getSavefilename().isEmpty()){
                myfood.setSavefilename(mf.getSavefilename());
            }
            mfr.save(myfood);
        }
    }

    public Object findOneMyrefrigerator(int mfnum) {
        // Optional<MyFood> 객체를 사용하여 데이터의 존재 여부를 확인
        Optional<MyFood> optionalMyFood = mfr.findByMfnum(mfnum);
        // Optional의 값이 존재할 경우 해당 값을 반환, 그렇지 않으면 null 반환
        return optionalMyFood.orElse(null);
    }

}
