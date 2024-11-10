import prisma from "../../config/prisma";
import { IMember } from "./member.interface";

const createMember = async (data: IMember) => {
  const result = await prisma.member.create({ data: data });
  return result;
};

const getMembers = async () => {
  const result = await prisma.member.findMany();
  return result;
};

const getMemberByMemberId = async (id: string) => {
  const result = await prisma.member.findUnique({
    where: {
      memberId: id,
    },
  });
  return result;
};

const updateMember = async (id: string, data: Partial<IMember>) => {
  const isExist = await prisma.member.findUnique({
    where: {
      memberId: id,
    },
  });
  if (!isExist) {
    throw new Error(`Member with id '${id}' not found`);
  }
  const result = await prisma.member.update({
    where: {
      memberId: id,
    },
    data: data,
  });
  return result;
};

const deleteMember = async (id: string) => {
  const isExist = await prisma.member.findUnique({
    where: {
      memberId: id,
    },
  });
  if (!isExist) {
    throw new Error(`Member with id '${id}' not found`);
  }
  const result = await prisma.member.delete({
    where: {
      memberId: id,
    },
  });
  return result;
};

export const memberService = {
  createMember,
  getMembers,
  getMemberByMemberId,
  updateMember,
  deleteMember
};
