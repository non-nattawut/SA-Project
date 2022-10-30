package main

import (
	appointment_controller "github.com/non-nattawut/patient-management-system/controller/appointment"
	BillController "github.com/non-nattawut/patient-management-system/controller/bill"
	bloodgroups_controller "github.com/non-nattawut/patient-management-system/controller/bloodgroups"
	department_controller "github.com/non-nattawut/patient-management-system/controller/department"
	diagnostic_controller "github.com/non-nattawut/patient-management-system/controller/diagnostic"
	dispensation_controller "github.com/non-nattawut/patient-management-system/controller/dispensation"
	employee_controller "github.com/non-nattawut/patient-management-system/controller/employee"
	login_controller "github.com/non-nattawut/patient-management-system/controller/login"
	patient_controller "github.com/non-nattawut/patient-management-system/controller/patient"
	patient_rights_controller "github.com/non-nattawut/patient-management-system/controller/patient_rights"
	"github.com/non-nattawut/patient-management-system/entity"
	middlewares "github.com/non-nattawut/patient-management-system/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	// login User Route
	r.POST("/login", login_controller.Login)

	router := r.Group("")
	{
		protected := router.Use(middlewares.Authorizes())
		{
			//Department
			protected.GET("/departments", department_controller.ListDepartment)

			//bloodgroups
			protected.GET("/bloodgroups", bloodgroups_controller.ListBloodGroups)

			//patient_rights
			protected.GET("/patientrights", patient_rights_controller.ListPatientRights)

			//gender
			protected.GET("/genders", employee_controller.ListGenders)

			//position
			protected.GET("/positions", employee_controller.ListPosition)

			//Employee
			protected.POST("/employees", employee_controller.CreateEmployees)
			protected.GET("/employees", employee_controller.ListEmployees)

			//didpensation
			protected.GET("/dispensations", dispensation_controller.ListDispensations)
			protected.POST("/dispensations", dispensation_controller.CreateDispensation)
			protected.GET("/dispensations_table", dispensation_controller.ListDispensationsTable)
			protected.GET("/medicines", dispensation_controller.ListMedicines)

			protected.POST("/dispensation_medicines", dispensation_controller.CreateDispensationMedicine)
			protected.GET("/dispensation_medicines", dispensation_controller.ListDispensationMedicinesTable)

			//appointment
			protected.POST("/appointment", appointment_controller.CraeteAppointment)
			protected.GET("/appoinment/:id", appointment_controller.GetAppointment)
			protected.GET("/appointment", appointment_controller.ListAppointment)

			//patient
			protected.POST("/patients", patient_controller.CreatePatients)
			protected.GET("/patients", patient_controller.ListPetients)
			protected.GET("/patient_table", patient_controller.ListPetients_Table)

			// Bill Routes
			protected.GET("/paymenttype", BillController.ListPaymentType)

			protected.GET("/bill", BillController.ListBill)
			protected.GET("/bill/:id", BillController.GetBill)
			protected.POST("/bill", BillController.CreateBill)
			protected.PATCH("/bill", BillController.UpdateBill)
			protected.DELETE("/bill/:id", BillController.DeleteBill)

			protected.GET("/dispensations_bill", dispensation_controller.ListDispensations_Bill)
			protected.GET("/bill_join", BillController.ListBill_Join)
			protected.GET("/diagnostic", diagnostic_controller.ListDiagnostics_Bill)

			// Diagnostic Routes
			protected.GET("/diagnostics", diagnostic_controller.ListDiagnostics)
			protected.GET("/diagnostic/:id", diagnostic_controller.GetDiagnostic)
			protected.POST("/diagnostics", diagnostic_controller.CreateDiagnostic)
			protected.PATCH("/diagnostics", diagnostic_controller.UpdateDiagnostic)
			protected.DELETE("/diagnostics/:id", diagnostic_controller.DeleteDiagnostic)
			protected.GET("/diagnostictypes", diagnostic_controller.ListDiagnostic_Types) // Diagnostic_Type Route
			protected.GET("/diseases", diagnostic_controller.ListDiseases)                // Disease Routes
		}
	}

	r.Run() // run server
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return

		}
		c.Next()
	}
}
