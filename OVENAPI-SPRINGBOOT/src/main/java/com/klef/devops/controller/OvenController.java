package com.klef.devops.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klef.devops.model.Oven;
import com.klef.devops.service.OvenService;


@RestController
@RequestMapping("/api/ovens")
@CrossOrigin("*")
public class OvenController {

    @Autowired
    private OvenService service;

    @GetMapping("/")
    public String home() {
        return "FULLSTACK MICROWAVE OVEN PROJECT";
    }

    // View all ovens
    @GetMapping("/viewall")
    public List<Oven> viewAllOvens() {
        return service.viewAllOvens();
    }

    // View oven by ID
    @GetMapping("/view/{id}")
    public Oven viewById(@PathVariable int id) {
        return service.viewById(id);
    }

    // Add oven
    @PostMapping("/add")
    public String addOven(@RequestBody Oven oven) {
        return service.addOven(oven);
    }

    // Update oven by ID
    @PutMapping("/update/{id}")
    public String updateOven(@PathVariable int id, @RequestBody Oven oven) {
        return service.updateOven(id, oven);
    }

    // Delete oven by ID
    @DeleteMapping("/delete/{id}")
    public String deleteOven(@PathVariable int id) {
        return service.deleteOven(id);
    }
}
