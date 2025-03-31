@echo off
REM Ejecutar consulta Carrito Supabase 
psql "postgresql://postgres.sekdbuyfagmxznohzuhp:Holaseba1403!@aws-0-sa-east-1.pooler.supabase.com:5432/postgres" -c "SELECT * FROM products LIMIT 1;"

