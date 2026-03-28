from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db
from app.dependencies.auth import get_current_active_user

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@router.post("/", response_model=schemas.TaskResponse)
def create_task(
    task: schemas.TaskCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)  # <-- PEGA USUÁRIO LOGADO
):
    """
    Cria uma nova tarefa para o usuário logado
    Não precisa mais enviar user_id no JSON!
    """
    # AGORA USA current_user.id em vez de task.user_id
    new_task = models.Task(
        title=task.title,
        description=task.description,
        completed=False,
        user_id=current_user.id  # <-- PEGA DO USUÁRIO LOGADO
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@router.get("/", response_model=list[schemas.TaskResponse])
def list_my_tasks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)  # <-- PEGA USUÁRIO LOGADO
):
    """
    Lista apenas as tarefas do usuário logado
    """
    tasks = db.query(models.Task).filter(models.Task.user_id == current_user.id).all()
    return tasks

# REMOVA ou modifique a rota /user/{user_id} - não precisamos mais dela
# Vamos manter apenas para referência, mas comentada
# @router.get("/user/{user_id}", ...)

@router.get("/{task_id}", response_model=schemas.TaskResponse)
def get_task(
    task_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Busca uma tarefa específica (apenas se for do usuário)"""
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id  # <-- SÓ BUSCA SE FOR DO USUÁRIO
    ).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return task

@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    task_id: int, 
    task_update: schemas.TaskCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Atualiza uma tarefa (apenas se for do usuário)"""
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    task.title = task_update.title
    task.description = task_update.description
    
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(
    task_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Deleta uma tarefa (apenas se for do usuário)"""
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    db.delete(task)
    db.commit()
    return {"mensagem": "Tarefa deletada com sucesso"}

@router.patch("/{task_id}/complete")
def complete_task(
    task_id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Alterna o status completed da tarefa"""
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == current_user.id
    ).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    task.completed = not task.completed
    
    db.commit()
    db.refresh(task)
    return task