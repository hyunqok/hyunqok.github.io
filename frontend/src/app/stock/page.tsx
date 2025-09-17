import Link from 'next/link';

export default function Stock() {
	return (
		<main className="container mx-auto">
			<ul className="list-disc [&_a]:hover:underline">
				<li>
					<Link href="/stock/stockAveragingCalculator">물타기 계산기</Link>
				</li>
			</ul>
		</main>
	);
}
