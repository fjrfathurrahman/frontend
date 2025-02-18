import { ButtonGroup, Chip } from "@nextui-org/react";
import { Page, RowProps } from "../types/Types";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { MdDelete, MdModeEdit, MdRemoveRedEye } from "react-icons/md";
import formatCurrency from "./Total";

export default function GetKeyValue( item: RowProps, columnKey: string, index: number, page: Page, openDeleteModal: (id: number) => void) {
  switch (columnKey as string) {
    case "id":
      return index + 1;

    case "customer_id":
      return item.customer?.name;

    case "admin_id":
      return item.admin?.name;

    case "type":
      return <Chip color={item.type === 'deposit' ? 'success' : item.type === 'withdrawal' ? 'danger' : 'default'} variant="flat">{item.type === 'deposit' ? 'Deposit' : item.type === 'withdrawal' ? 'Withdrawal' : null}</Chip> 

    case "role":
      return <Chip color={item.role === 'admin' ? 'primary' : item.role === 'teacher' ? 'success' : item.role === 'superadmin' ? 'danger' : 'default'} variant="flat" className="capitalize">{item.role}</Chip>
    
    case "amount":
      return <Chip color="primary" variant="flat">{formatCurrency(item.amount as number)}</Chip>

    case "balance":
      return <Chip color="primary" variant="flat">{formatCurrency(item.balance as number)}</Chip>

    case "action":
      return (
        <ButtonGroup>
          <Button isIconOnly color="warning">
            <Link href={`/dashboard/detail${page}/${item.id}`} className="text-white">
              <MdRemoveRedEye size={18} />
            </Link>
          </Button>
          <Button isIconOnly color="primary">
            <Link href={`/dashboard/update${page}/${item.id}`}>
              <MdModeEdit size={18} />
            </Link>
          </Button>
          <Button isIconOnly startContent={<MdDelete size={18} />} color="danger" onClick={() => openDeleteModal(item.id)} />
        </ButtonGroup>
      );

    case "view":
      return (
        <Button isIconOnly color="warning">
          <Link href={`/detail${page}/${item.id}`} className="text-white">
            <MdRemoveRedEye size={18} />
          </Link>
        </Button>
      )
    
    case "major":
      return <span className="line-clamp-1 text-small">{item.major}</span>

    default:
      return item[columnKey] as React.ReactNode ?? "-";
  }
}
