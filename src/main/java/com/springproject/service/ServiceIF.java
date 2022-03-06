package com.springproject.service;

import java.util.List;

public interface ServiceIF<T> {
	
T create(T t);
	
	List<T> getAll();
	
	T getById(Integer id);
	
	T replace(Integer id,T t);
	
	void remove(Integer id);

}

