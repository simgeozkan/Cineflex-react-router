package main

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	// "github.com/go-chi/jwtauth/v5" // Firebase Auth için ileride eklenebilir
	// "github.com/aws/aws-sdk-go-v2/service/dynamodb" // DynamoDB için ileride eklenebilir
)

// HealthResponse basit health endpoint'i için struct
type HealthResponse struct {
	Status string `json:"status"`
}

// List örnek veri modeli (ileride DynamoDB ile değiştirilebilir)
type List struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func main() {
	r := chi.NewRouter()

	// Ortak middleware'ler
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// İleride Firebase Auth middleware'i buraya eklenebilir
	// r.Use(FirebaseAuthMiddleware)

	// Health endpoint
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(HealthResponse{Status: "ok"})
	})

	// Lists endpoint (örnek veri ile)
	r.Get("/lists", func(w http.ResponseWriter, r *http.Request) {
		lists := []List{
			{ID: "1", Name: "Sample List 1"},
			{ID: "2", Name: "Sample List 2"},
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(lists)
	})

	// Sunucuyu başlat
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	print("Listening on :" + port + "\n")
	http.ListenAndServe(":"+port, r)
}

// İleride eklenecek örnek Firebase Auth middleware fonksiyonu
// func FirebaseAuthMiddleware(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		// Firebase token doğrulama işlemleri burada olacak
// 		next.ServeHTTP(w, r)
// 	})
// }
