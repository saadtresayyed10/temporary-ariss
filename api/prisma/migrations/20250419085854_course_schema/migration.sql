-- CreateTable
CREATE TABLE "Course" (
    "course_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "CourseQuestion" (
    "question_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "answer" INTEGER NOT NULL,

    CONSTRAINT "CourseQuestion_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "CourseEnrollment" (
    "enrollment_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_type" "UserType" NOT NULL,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPassed" BOOLEAN NOT NULL DEFAULT false,
    "passedAt" TIMESTAMP(3),
    "grade" DOUBLE PRECISION,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("enrollment_id")
);

-- CreateTable
CREATE TABLE "CourseAnswer" (
    "answer_id" TEXT NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "selected" INTEGER NOT NULL,

    CONSTRAINT "CourseAnswer_pkey" PRIMARY KEY ("answer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseEnrollment_course_id_user_id_key" ON "CourseEnrollment"("course_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "CourseAnswer_enrollment_id_question_id_key" ON "CourseAnswer"("enrollment_id", "question_id");

-- AddForeignKey
ALTER TABLE "CourseQuestion" ADD CONSTRAINT "CourseQuestion_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAnswer" ADD CONSTRAINT "CourseAnswer_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "CourseEnrollment"("enrollment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAnswer" ADD CONSTRAINT "CourseAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "CourseQuestion"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;
