"use client";
import { TeacherGlobal } from "@/app/common/types";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AdminEachStaff from "./AdminEachStaff";

interface StaffComponentProps {
  item: TeacherGlobal[];
  onOrderChange: (newStaff: TeacherGlobal[]) => void;
}

// item은 국제교류원, 국제교류팀, 중국센터 배열의 값
export default function StaffComponent({ item, onOrderChange }: StaffComponentProps) {
  const [items, setItems] = useState(item);
  useEffect(()=>{
    setItems(item);
  }, [item]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [updateModalId, setUpdateModalId] = useState<number | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (active.id !== over?.id) {
            const oldIndex = items.findIndex((item) => String(item.id) === active.id);
            const newIndex = items.findIndex((item) => String(item.id) === over?.id);
            const newOrder = arrayMove(items, oldIndex, newIndex);
            setItems(newOrder);
            onOrderChange?.(newOrder);
          }
        }}
      >
        <SortableContext items={items.map((item) => String(item.id))} strategy={verticalListSortingStrategy}>
          {items.map((teacher) => (
            <AdminEachStaff key={teacher.id} staff={teacher}  activeMenuId={activeMenuId}    setActiveMenuId={setActiveMenuId}    updateModalId={updateModalId}    setUpdateModalId={setUpdateModalId}    deleteModalId={deleteModalId}    setDeleteModalId={setDeleteModalId}  />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
}
