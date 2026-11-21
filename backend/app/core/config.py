from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db: str = "up_kisan_sewa"
    jwt_secret: str = "change-me-in-production"
    cron_secret: str = "change-me-cron"
    frontend_url: str = "http://localhost:3000"
    
    # SMTP / Email Configuration
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str = "akhil78026@gmail.com"
    smtp_password: str = "wgyycpliximdcjti"
    email_api_key: str = "wgyycpliximdcjti"
    email_from: str = "akhil78026@gmail.com"
    contact_email: str = "akhil78026@gmail.com"
    
    # Admin Credentials
    admin_email: str = "akhil78026@gmail.com"
    admin_initial_password: str = "MCAET@123"
    
    # External APIs
    data_gov_api_key: str = ""
    data_gov_mandi_api_url: str = ""
    http_user_agent: str = "UPKisanSewa/1.0 (NDUAT project; contact: akhil78026@gmail.com)"


settings = Settings()
