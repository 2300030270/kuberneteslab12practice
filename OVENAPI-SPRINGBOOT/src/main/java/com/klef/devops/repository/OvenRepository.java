package com.klef.devops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.devops.model.Oven;

@Repository
public interface OvenRepository extends JpaRepository<Oven, Integer> {
}
