import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/roles.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalResponseSwagger } from 'src/decorators/swagger.decorator';

@ApiTags('Metrics')
@UseGuards(AuthGuard('jwt'))
@GlobalResponseSwagger()
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Post()
  @ApiOperation({ summary: 'Create a new metric' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMetricDto: CreateMetricDto) {
    return this.metricsService.create(createMetricDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all metrics' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.metricsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a metric by id' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.metricsService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Put(':id')
  @ApiOperation({ summary: 'Update a metric by id' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateMetricDto: UpdateMetricDto) {
    return this.metricsService.update(+id, updateMetricDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a metric by id' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.metricsService.remove(+id);
  }
}
