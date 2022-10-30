package controller

import (
	"github.com/non-nattawut/patient-management-system/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// func ListPaymentType(c *gin.Context) {
// 	var paymenttype []entity.Payment_type
// 	if err := entity.DB().Raw("SELECT * FROM payment_types").Scan(&paymenttype).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": paymenttype})
// }

func ListPaymentType(c *gin.Context) {
	var payment_type []entity.Payment_type

	/*** ตอนแสดงผลตารางต้องมี prepload ***/
	if err := entity.DB().Raw("SELECT * FROM payment_types").Find(&payment_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment_type})
}
