package controller

import (
	"fmt"

	"github.com/non-nattawut/patient-management-system/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

type Bill_Join struct {
	ID              uint   `JSON: "ID"`
	Medicine_Name   string `JSON: "Medicine_Name"`
	Medicine_Price  uint   `JSON: "Medicine_Price"`
	Medicine_Amount uint   `JSON: "Medicine_Amount"`
	Dispensation_ID uint   `JSON: "Dispensation_ID"`
}

func ListBill_Join(c *gin.Context) {
	var billjoin []Bill_Join

	if err := entity.DB().Raw("SELECT * FROM (SELECT * FROM (SELECT * FROM dispensations INNER JOIN dispensation_medicines INNER JOIN medicines ON dispensations.id = dispensation_medicines.dispensation_id and medicines.id = dispensation_medicines.medicine_id) AS x)").Find(&billjoin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Print(billjoin)

	c.JSON(http.StatusOK, gin.H{"data": billjoin})
}
