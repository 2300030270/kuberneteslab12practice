package com.klef.devops.service;

import java.util.List;
import com.klef.devops.model.Oven;

public interface OvenService {
    String addOven(Oven oven);
    String deleteOven(int id);
    List<Oven> viewAllOvens();
    Oven viewById(int id);
    String updateOven(int id, Oven oven);
}
