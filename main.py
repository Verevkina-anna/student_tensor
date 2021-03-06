from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import db_helper
import const
import uvicorn

class Student(BaseModel):
	id: int=None
	name: str
	university: str
	course: int
	city: str
	avatar_url: str
	email: str
	telefon: str

		
app= FastAPI()
app.add_middleware(
	CORSMiddleware,
	allow_credentials=True,
	allow_origins=["*"],
	allow_methods=["*"],
	allow_headers=["*"],
)

@app.get('/students')
def students_list():
	"""
	Получение списка 
	"""
	sql="""
		select
			id,
			name,
			university,
			course,
			city,
			avatar_url,
			email,
			telefon
		from students
	"""
	return db_helper.execute_query(sql)

@app.put('/students/{id}')
def update(id: int, payload: Student):
    """
    Обновление карточки.
    """
    sql = """
        update students
        set name = %s::text, university = %s::text, course = %s::int, city = %s::text, avatar_url = %s::text, email = %s::text, telefon = %s::text
        where id = %s::int
    """
    db_helper.execute_query(
        sql,
        payload.name,
        payload.university,
		payload.course,
		payload.city,
        payload.avatar_url,
		payload.email,
		payload.telefon,
        payload.id
    )
	
@app.get('/students/{id}')
def student_card(id: int , payload: Student):
	"""
	Просмотр  
	"""
	sql= """
		select
			id,
			name,
			university,
			course,
			city,
			avatar_url,
			email,
			telefon
		from students
	"""
	db_helper.execute_query(
		sql,
		payload.name, 
		payload.university, 
		payload.course,
		payload.city,
		payload.avatar_url,
		payload.email,
		payload.telefon,
		payload.id
	)

@app.post('/students/')
def create (payload: Student):
	"""
	 Создание студента
	"""
	sql="""
		insert into students (name, university, course, city, avatar_url, email, telefon)
		values  (%s::text, %s::text, %s::int ,%s::text, %s::text, %s::text, %s::text)
	 """
	db_helper.execute_query(
		sql,
		payload.name, 
		payload.university, 
		payload.course,
		payload.city, 
		payload.avatar_url,
		payload.email,
		payload.telefon
	)
@app.delete('/students/{id}')
def delete(id: int):
    """
    Удаление карточки.
    """
    sql = 'delete from students where id = %s::int'
    db_helper.execute_query(sql, id)

if __name__== '__main__':
	uvicorn.run (app,host=const.APP_IP, port= const.APP_PORT)