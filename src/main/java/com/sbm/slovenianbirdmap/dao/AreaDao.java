package com.sbm.slovenianbirdmap.dao;

import com.sbm.slovenianbirdmap.dao.mappers.AreaModelMapper;
import com.sbm.slovenianbirdmap.models.AreaModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaDao extends AbstractDao {
    public List<AreaModel> getAllAreas() {
        String sql = areaSQL.getGetAllAreas();

        return jdbcTemplate.query(sql, new AreaModelMapper());
    }
}
