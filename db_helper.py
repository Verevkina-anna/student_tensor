from psycopg2 import connect, OperationalError, ProgrammingError
from psycopg2.extras import RealDictCursor
from typing import List
import const


def create_connection() -> connect:
	"""
	Функция для создания подключения к БД 
	"""
	try:
		con= connect(
			database=const.DB_NAME,
			user=const.DB_USER,
			password=const.DB_PASS,
			host=const.DB_HOST,
			port=const.DB_PORT
		)
		con.autocommit=True
	except OperationalError as e:
		con=None
		print("Error {e}")
	return con

def execute_query(query: str, *args) -> List[dict]:
	"""
	Функция запросов к бд
	"""
	con=create_connection()
	if not con:
		return None
	cursor= con.cursor(cursor_factory=RealDictCursor)
	try:
		cursor.execute(query, args)
		res=cursor.fetchall()
	except ProgrammingError:
		res=None
	except OperationalError as e:
		print("Error {e}")
		res=None
	finally:
		con.close()
	return res

