package com.sbm.slovenianbirdmap.dao;

import com.sbm.slovenianbirdmap.dao.mappers.BirdModelMapper;
import com.sbm.slovenianbirdmap.models.BirdModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BirdsDao extends AbstractDao {
    public List<BirdModel> getAllBird() {
        String sql = birdSQL.getGetAllBird();

        return jdbcTemplate.query(sql, new BirdModelMapper());
    }
}
