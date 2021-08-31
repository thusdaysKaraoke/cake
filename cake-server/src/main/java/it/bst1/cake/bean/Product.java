package it.bst1.cake.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Product {
	
	private Long id;
	private Long type;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date creationDate;
	 
	private Double currentPrice;
	private Double quantity;

	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getType() {
		return type;
	}
	public void setType(Long type) {
		this.type = type;
	}
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Double getQuantity() {
		return quantity;
	}
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	public Double getCurrentPrice() {
		return currentPrice;
	}
	public void setCurrentPrice(Double currentPrice) {
		this.currentPrice = currentPrice;
	}

}
