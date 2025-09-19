'use client';

import { cn } from '@/shared/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui/collapsible';
import Logo from '@/shared/ui/logo';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	useSidebar,
} from '@/shared/ui/sidebar';
import { BarChart3, Calculator, ChevronDown, DollarSign, Home, Settings, User } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
	{
		title: '메인',
		items: [
			{ title: '홈', url: '/', icon: Home },
			{ title: '소개', url: '/about', icon: User },
		],
	},
	{
		title: '주식',
		items: [
			{ title: '계좌 조회', url: '/stock', icon: BarChart3 },
			{ title: '물타기 계산기', url: '/stock/stockAveragingCalculator', icon: Calculator },
			{ title: '매매 전략', url: '/stock/tradingStrategy', icon: DollarSign },
		],
	},
	{
		title: '게시판',
		items: [{ title: '자유게시판', url: '/board', icon: Settings }],
	},
];

export function AppSidebar() {
	const { open } = useSidebar();
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/" aria-label="hyun qook jeong home">
								<span className="sr-only">hyun qook jeong home</span>
								<h1 className="logo-block flex w-full">
									<Logo className={cn(open ? '' : 'w-6')} />
								</h1>
							</Link>
							{/* <Link href="/">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Home className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">Portfolio</span>
									<span className="truncate text-xs">hyunqok</span>
								</div>
							</Link> */}
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{menuItems.map(group => (
					<SidebarGroup key={group.title}>
						{/* <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
							{group.title}
						</SidebarGroupLabel> */}
						<SidebarGroupContent>
							{/* 아이콘 모드에서 표시될 직접 메뉴 아이템들 */}
							<div className="hidden group-data-[collapsible=icon]:block">
								<SidebarMenu>
									{group.items.map(item => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton asChild tooltip={item.title}>
												<Link href={item.url}>
													<item.icon />
													<span className="sr-only">{item.title}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</div>

							{/* 확장 모드에서 표시될 Collapsible 메뉴 */}
							<div className="group-data-[collapsible=icon]:hidden">
								<SidebarMenu>
									<Collapsible defaultOpen className="group/collapsible">
										<SidebarMenuItem>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton className="w-full">
													<span>{group.title}</span>
													<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{group.items.map(item => (
														<SidebarMenuSubItem key={item.title}>
															<SidebarMenuSubButton asChild>
																<Link href={item.url}>
																	<item.icon className="h-4 w-4" />
																	<span>{item.title}</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										</SidebarMenuItem>
									</Collapsible>
								</SidebarMenu>
							</div>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				{/* <div className="text-muted-foreground p-4 text-sm">© 2025 Portfolio</div> */}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

export { SidebarProvider };
