package com.sbm.slovenianbirdmap.dao;

import com.sbm.slovenianbirdmap.dao.mappers.BirdModelMapper;
import com.sbm.slovenianbirdmap.models.BirdModel;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BirdsDao extends AbstractDao {
    public List<BirdModel> getSomeBird(Long limit, Long offset) {
        String sql = birdSQL.getGetSomeBirds();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("limit", limit)
                .addValue("offset", offset);

        return namedParameterJdbcTemplate.query(sql, params, new BirdModelMapper());
    }

    public List<BirdModel> getAllBird() {
        String sql = birdSQL.getGetAllBird();

        return jdbcTemplate.query(sql, new BirdModelMapper());
    }

    public List<BirdModel> searchBirdByTerm(String term, Long limit, Long offset) {
        String sql = birdSQL.getSearchBirdByTerm();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("name", "%" + term.toLowerCase() + "%")
                .addValue("nameLat", "%" + term.toLowerCase() + "%")
                .addValue("limit", limit)
                .addValue("offset", offset);

        return namedParameterJdbcTemplate.query(sql, params, new BirdModelMapper());
    }

    public BirdModel getBirdByID(Long birdID) {
        String sql = birdSQL.getGetBirdByID();

        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("birdID", birdID);

        return namedParameterJdbcTemplate.queryForObject(sql, params, new BirdModelMapper());
    }
}
