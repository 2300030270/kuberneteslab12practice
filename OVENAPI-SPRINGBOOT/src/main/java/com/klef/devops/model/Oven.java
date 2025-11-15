package com.klef.devops.model;

import jakarta.persistence.*;

@Entity
@Table(name = "oven_table")
public class Oven {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "oven_id")
    private int id;

    @Column(name = "oven_brand", length = 50, nullable = false)
    private String brand;

    @Column(name = "oven_model_name", length = 50, nullable = false, unique = true)
    private String modelName;

    @Column(name = "oven_capacity", nullable = false)
    private int capacity; // in liters

    @Column(name = "oven_price", nullable = false)
    private double price;

    @Column(name = "oven_colour", length = 30, nullable = false)
    private String colour;

    // Getters and Setters
    public int getId() { 
        return id; 
    }
    public void setId(int id) { 
        this.id = id; 
    }

    public String getBrand() { 
        return brand; 
    }
    public void setBrand(String brand) { 
        this.brand = brand; 
    }

    public String getModelName() { 
        return modelName; 
    }
    public void setModelName(String modelName) { 
        this.modelName = modelName; 
    }

    public int getCapacity() { 
        return capacity; 
    }
    public void setCapacity(int capacity) { 
        this.capacity = capacity; 
    }

    public double getPrice() { 
        return price; 
    }
    public void setPrice(double price) { 
        this.price = price; 
    }

    public String getColour() { 
        return colour; 
    }
    public void setColour(String colour) { 
        this.colour = colour; 
    }
}
