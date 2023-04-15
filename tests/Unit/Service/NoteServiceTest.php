<?php
declare(strict_types=1);
// SPDX-FileCopyrightText: Poulou <pouloutidis.d@gmail.com>
// SPDX-License-Identifier: AGPL-3.0-or-later

namespace OCA\HassIntegration\Tests\Unit\Service;

use OCA\HassIntegration\Service\NoteNotFound;
use PHPUnit\Framework\TestCase;

use OCP\AppFramework\Db\DoesNotExistException;

use OCA\HassIntegration\Db\Note;
use OCA\HassIntegration\Service\NoteService;
use OCA\HassIntegration\Db\NoteMapper;

class NoteServiceTest extends TestCase {
	private NoteService $service;
	private string $userId = 'john';
	private $mapper;

	public function setUp(): void {
		$this->mapper = $this->getMockBuilder(NoteMapper::class)
			->disableOriginalConstructor()
			->getMock();
		$this->service = new NoteService($this->mapper);
	}

	public function testUpdate(): void {
		// the existing note
		$note = Note::fromRow([
			'id' => 3,
			'title' => 'yo',
			'content' => 'nope'
		]);
		$this->mapper->expects($this->once())
			->method('find')
			->with($this->equalTo(3))
			->will($this->returnValue($note));

		// the note when updated
		$updatedNote = Note::fromRow(['id' => 3]);
		$updatedNote->setTitle('title');
		$updatedNote->setContent('content');
		$this->mapper->expects($this->once())
			->method('update')
			->with($this->equalTo($updatedNote))
			->will($this->returnValue($updatedNote));

		$result = $this->service->update(3, 'title', 'content', $this->userId);

		$this->assertEquals($updatedNote, $result);
	}

	public function testUpdateNotFound(): void {
		$this->expectException(NoteNotFound::class);
		// test the correct status code if no note is found
		$this->mapper->expects($this->once())
			->method('find')
			->with($this->equalTo(3))
			->will($this->throwException(new DoesNotExistException('')));

		$this->service->update(3, 'title', 'content', $this->userId);
	}
}
