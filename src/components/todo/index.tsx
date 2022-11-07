import React, { useState } from 'react';
import Button from '../ui/button';
import { trpc } from '../../utils/trpc';
import clsx from 'clsx';
import {
  CheckIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateTodo } from '../../server/trpc/router/todo';
import { updateTodo } from '../../utils/schema';

interface TodoProps {
  title: string;
  id: string;
  completed: boolean;
}

const Todo: React.FC<TodoProps> = ({ title, id, completed }) => {
  const [completeTodoState, setCompleteTodoState] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [updateValue, setUpdateValue] = useState('');
  const utils = trpc.useContext();
  const { mutate: deleteTodoMutation } = trpc.todo.deleteTodo.useMutation({
    onSuccess: () => {
      utils.todo.getTodos.invalidate();
    },
  });
  const { mutate: updateTodoMutation } = trpc.todo.updateTodo.useMutation({
    onSuccess: () => {
      utils.todo.getTodos.invalidate();
    },
  });
  const { mutate: completeTodo, isLoading: completeTodoLoading } =
    trpc.todo.completeTodo.useMutation({
      onSuccess: () => {
        utils.todo.getTodos.invalidate();
      },
    });
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateTodo>({
    resolver: zodResolver(updateTodo),
  });

  async function handleDelete() {
    deleteTodoMutation({ id });
  }

  const onSubmit: SubmitHandler<UpdateTodo> = async (ctx) => {
    setIsEditing(false);
    updateTodoMutation({
      id,
      title: ctx.title,
    });
  };

  function handleToggleEdit() {
    setIsEditing(!isEditing);
  }

  async function handleComplete() {
    //optimistic update
    if (completeTodoLoading) {
      return;
    }
    setCompleteTodoState(!completeTodoState);
    completeTodo({
      id,
      completed: !completed,
    });
  }

  return (
    <div
      className={clsx(
        'flex w-full items-center justify-between rounded bg-white p-3 shadow-md transition-colors duration-300 ease-in-out',
        {
          'bg-green-200': completeTodoState,
        },
      )}
    >
      {isEditing ? (
        <div className="flex w-full items-center justify-between">
          <input
            onChange={(e) => setUpdateValue(e.target.value)}
            className={clsx('w-full flex-1 rounded  focus:outline-none', {
              'bg-green-200': completeTodoState,
            })}
            type="text"
            placeholder={`Edit Todo: ${title}`}
          />
          <div className="mr-2">
            <Button
              onClick={() => onSubmit({ title: updateValue, id })}
              theme="success"
              size="small"
              title="Delete"
            >
              <ArrowRightIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      ) : (
        <p
          className={clsx('eas text-neutral-900 transition-colors', {
            'text-neutral-400 line-through': completeTodoState,
          })}
        >
          {title}
        </p>
      )}
      <div className="flex space-x-2">
        <Button
          onClick={handleToggleEdit}
          theme="tertiary"
          size="small"
          title="Edit"
        >
          <PencilSquareIcon className="h-6 w-6" title="Edit Todo" />
        </Button>

        {!completeTodoState ||
          (!isEditing && (
            <Button
              onClick={handleComplete}
              theme="warning"
              size="small"
              title="Edit"
            >
              <XMarkIcon className="h-6 w-6" title="Reset Todo" />
            </Button>
          ))}
        {completeTodoState ||
          (!isEditing && (
            <Button
              onClick={handleComplete}
              theme="success"
              size="small"
              title="Edit"
            >
              <CheckIcon className="h-6 w-6" title="Complete Todo" />
            </Button>
          ))}

        <Button
          onClick={handleDelete}
          theme="danger"
          size="small"
          title="Delete"
        >
          <TrashIcon className="h-6 w-6" title="Delete Todo" />
        </Button>
      </div>
    </div>
  );
};

export default Todo;
