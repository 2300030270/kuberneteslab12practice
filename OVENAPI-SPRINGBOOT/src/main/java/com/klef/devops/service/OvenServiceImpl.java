package com.klef.devops.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.devops.model.Oven;
import com.klef.devops.repository.OvenRepository;

@Service
public class OvenServiceImpl implements OvenService {

    @Autowired
    private OvenRepository repo;

    @Override
    public String addOven(Oven oven) {
        repo.save(oven);
        return "Oven details added successfully!";
    }

    @Override
    public String deleteOven(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "Oven with ID " + id + " deleted successfully!";
        } else {
            return "Oven with ID " + id + " not found!";
        }
    }

    @Override
    public List<Oven> viewAllOvens() {
        return repo.findAll();
    }

    @Override
    public Oven viewById(int id) {
        Optional<Oven> oven = repo.findById(id);
        return oven.orElse(null);
    }

    @Override
    public String updateOven(int id, Oven oven) {
        Optional<Oven> optionalOven = repo.findById(id);
        if (optionalOven.isPresent()) {
            Oven existing = optionalOven.get();
            existing.setBrand(oven.getBrand());
            existing.setModelName(oven.getModelName());
            existing.setCapacity(oven.getCapacity());
            existing.setPrice(oven.getPrice());
            existing.setColour(oven.getColour());
            repo.save(existing);
            return "Oven with ID " + id + " updated successfully!";
        } else {
            return "Oven with ID " + id + " not found!";
        }
    }
}
